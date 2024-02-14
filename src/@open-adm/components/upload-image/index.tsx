import { useState } from 'react';
import { IconButton } from '@mui/material';
import IconifyIcon from 'src/@core/components/icon';

interface propsImage {
    upload: (value: string) => void;
}

export function UploadImage(props: propsImage) {
    const [image, setImage] = useState<string | undefined>();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        if (event.target.files && event.target.files[0]) {
            const input = event.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setImage(reader.result);

                    setTimeout(() => {
                        props.upload(reader.result as string)
                    }, 1000)
                    const image = new Image();
                    image.src = reader.result;
                }
            };
            reader.readAsDataURL(input);
        }
    };

    return (
        <>
            <label style={{
                color: '#FFF',
                textTransform: 'uppercase',
                textAlign: 'center',
                display: 'block',
                marginTop: '10px',
                cursor: 'pointer',

            }}>
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <IconButton component="span">
                    <IconifyIcon
                        width='50px'
                        icon='material-symbols:add-a-photo-outline'
                    />
                </IconButton>
            </label>
        </>
    );
}