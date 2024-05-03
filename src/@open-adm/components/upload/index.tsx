import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Icon from 'src/@core/components/icon'
import { useDropzone } from 'react-dropzone'

interface FileProp {
    name: string
    type: string
    size: number
}

interface propsFileUploaderSingle {
    title: string;
    maringTop?: number;
    setFoto: (foto: string) => void;
    defaultValue?: string;
}

const FileUploaderSingle = (props: propsFileUploaderSingle) => {

    const [files, setFiles] = useState<File[]>([])
    const [accept, setAccept] = useState<boolean>();
    const [reject, setReject] = useState<boolean>();

    const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
        multiple: false,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif']
        },
        onDrop: async (acceptedFiles: File[]) => {
            setReject(isDragReject);
            setAccept(isDragAccept);
            const newBase64Images = await Promise.all(acceptedFiles.map(file => getBase64(file))) as any[];
            const index = newBase64Images[0].indexOf(',') + 1;
            const newFoto = newBase64Images[0].slice(index);
            props.setFoto(newFoto)
            setFiles(acceptedFiles.map((file: File) => {
                return Object.assign(file)
            }))
        }
    })

    const img = files.map((file: FileProp) => (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
                border: `1px dashed ${accept ? 'green' : reject ? 'red' : '#e5e5e5'}`,
                marginTop: 5,
            }}
        >
            <img key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file as any)} />
        </Box>
    ))

    const getBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    };

    const dataURLtoFile = (dataurl: any, filename: string) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const buffer = Buffer.from(arr[1], 'base64');
        const file = new File([buffer], filename, { type: mime });
        return file;
    }

    useEffect(() => {
        const init = () => {
            if (props.defaultValue) {
                const base64 = `data:image/jpeg;base64,${props.defaultValue}`;
                const file = dataURLtoFile(base64, 'foto.jpg');
                setFiles([file])
            }
        };

        init();
    }, [])

    return (
        <Box {...getRootProps({ className: 'dropzone' })} sx={files.length ? { height: 450 } : {}}>
            <input {...getInputProps()} />
            {files.length ? (
                img
            ) : (
                <Box sx={{
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    cursor: 'hover',
                    borderRadius: '5px',
                    border: `1px dashed ${accept ? 'green' : reject ? 'red' : '#e5e5e5'}`,
                    marginTop: props.maringTop,
                    padding: 5
                }}>
                    <Box
                        sx={{
                            mb: 8.75,
                            width: 48,
                            height: 48,
                            display: 'flex',
                            borderRadius: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.08)`,
                        }}
                    >
                        <Icon icon='tabler:upload' fontSize='1.75rem' cursor='hover' />
                    </Box>
                    <Typography variant='h4' sx={{ mb: 2.5 }}>
                        {props.title}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}

export default FileUploaderSingle
