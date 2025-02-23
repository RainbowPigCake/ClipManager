import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormDescription } from "@/components/ui/form";
import { Button } from '@/components/ui/button';

export default function Settings({ handleChooseFolder }) {
    const [clipFolderPath, setClipFolderPath] = useState("");

    useEffect(() => {
        const storedClipFolderPath = localStorage.getItem('clipFolderPath');
        // const storedVolume = localStorage.getItem('volume');

        if (storedClipFolderPath) {
            setClipFolderPath(storedClipFolderPath);
        }
        // if (storedVolume) {
        //   setVolume(Number(storedVolume));
        // }
    }, []);


    // const handleClipFolderPathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const path = event.target.files?.[0]?.webkitRelativePath || '';
    //     setClipFolderPath(path);
    //     localStorage.setItem('clipFolderPath', path);
    // };

    return (
        <>
            <div className="p-6 mr-16">
                <div className="grid max-w-sm items-center gap-1.5">
                    <Label htmlFor="folder">Clip Folder</Label>
                    <Button className='w-[100px]' onClick={handleChooseFolder}>Browse</Button>
                    <p
                        id="folder"
                        className={"text-[0.8rem] text-muted-foreground"}>
                        Choose where clips are stored
                    </p>
                </div>
            </div >
        </>
    );
}
