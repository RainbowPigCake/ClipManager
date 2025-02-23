// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

use std::fs;
use serde::{Deserialize, Serialize};
use tauri::Manager;

#[derive(Serialize, Deserialize)]
struct AppSettings {
    clip_folder_path: String,
    volume: f32,
}

#[tauri::command]
fn get_clip_file_paths(directory: &str) -> Result<Vec<String>, String> {
    use std::fs;
    use std::path::Path;

    // Validate directory path first
    let dir_path = Path::new(directory);
    if !dir_path.exists() || !dir_path.is_dir() {
        return Err(format!(
            "Directory '{}' does not exist or is not a directory",
            directory
        ));
    }

    const VALID_EXTENSIONS: [&str; 6] = ["mp4", "mkv", "avi", "mov", "webm", "m4v"];

    // Use collect with take to limit the number of files processed
    let video_paths: Vec<String> = fs::read_dir(directory)
        .map_err(|err| format!("Error reading directory: {}", err))?
        .filter_map(|entry| {
            entry.ok().and_then(|e| {
                let path = e.path();
                path.extension()
                    .and_then(|ext| ext.to_str())
                    .and_then(|ext_str| {
                        if VALID_EXTENSIONS
                            .iter()
                            .any(|&valid_ext| ext_str.eq_ignore_ascii_case(valid_ext))
                        {
                            path.to_str().map(String::from)
                        } else {
                            None
                        }
                    })
            })
        })
        .collect();

    Ok(video_paths)
}

#[tauri::command]
async fn get_thumbnail(app_handle: tauri::AppHandle, video_path: String) -> Result<String, String> {
    use std::path::Path;
    use std::process::Command;

    let app_local_data = app_handle
        .path()
        .app_local_data_dir()
        .map_err(|_| "Could not get app local data dir")?;
    let resource_path = app_local_data.join("resources/ffmpeg.exe");

    // Create thumbnails directory in local app data
    let cache_dir = app_local_data.join("thumbnails");
    std::fs::create_dir_all(&cache_dir).map_err(|e| e.to_string())?;

    let thumb_path = cache_dir.join(format!(
        "{}.jpg",
        Path::new(&video_path)
            .file_stem()
            .unwrap()
            .to_str()
            .unwrap()
    ));

    // Return cached thumbnail if it exists
    if thumb_path.exists() {
        return Ok(thumb_path.to_str().unwrap().to_string());
    }

    // Use bundled ffmpeg.exe
    let output = Command::new(&resource_path)
        .args(&[
            "-i",
            &video_path,
            "-vframes",
            "1",
            "-vf",
            "scale=276:155",
            "-s",
            "276x155",
            "-q:v",
            "2",
            "-pix_fmt",
            "yuvj420p",
            "-preset",
            "veryslow",
            "-f",
            "image2",
            "-y",
            thumb_path.to_str().unwrap(),
        ])
        .output()
        .map_err(|e| format!("Failed to execute ffmpeg: {}", e))?;

    if !output.status.success() {
        return Err(String::from_utf8_lossy(&output.stderr).to_string());
    }

    Ok(thumb_path.to_str().unwrap().to_string())
}

#[tauri::command]
fn read_settings(app_handle: tauri::AppHandle) -> Result<AppSettings, String> {
    let settings_path = app_handle
        .path()
        .app_local_data_dir()
        .map_err(|_| "Could not get app local data dir")?
        .join("settings.json");

    if !settings_path.exists() {
        let default_settings = AppSettings {
            clip_folder_path: String::new(),
            volume: 0.5,
        };
        fs::write(&settings_path, serde_json::to_string(&default_settings).unwrap())
            .map_err(|e| e.to_string())?;
        return Ok(default_settings);
    }

    let settings_data = fs::read_to_string(&settings_path).map_err(|e| e.to_string())?;
    serde_json::from_str(&settings_data).map_err(|e| e.to_string())
}

#[tauri::command]
fn write_settings(app_handle: tauri::AppHandle, settings: AppSettings) -> Result<(), String> {
    let settings_path = app_handle
        .path()
        .app_local_data_dir()
        .map_err(|_| "Could not get app local data dir")?
        .join("settings.json");

    fs::write(&settings_path, serde_json::to_string(&settings).unwrap())
        .map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![get_clip_file_paths, get_thumbnail, read_settings, write_settings])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
