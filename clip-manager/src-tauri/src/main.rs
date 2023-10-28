// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn get_clip_file_paths(directory: &str) -> Result<Vec<String>, String> {
    let paths = fs::read_dir(directory).unwrap();
    let mut clip_paths = Vec::new();
    for path in paths {
        clip_paths.push(path.unwrap().path().into_os_string().into_string().unwrap());
    }
    Ok(clip_paths)
}

fn main() {
    tauri::Builder
        ::default()
        .invoke_handler(tauri::generate_handler![get_clip_file_paths])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
