import axios from "axios";


export const UploadFileHandler = async (
    e,
    folder = null,
    setUploading,
    prevImages,
    setImages,
    multiple = true
) => {
    const formData = new FormData()
    if (multiple) {
        const files = e;

        for (let i = 0; i < files.length; i++) {
            formData.append('Images', files[i])
        }
    } else {
        formData.append('Images', e.target.files[0])
    }
    setUploading(true);

    try {
        // const config = {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //         Folder: folder
        //     }
        // }
        const {data} = await axios.post('http://localhost:5000/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        multiple ? setImages(prevImages.concat(data.data)) : setImages(data.data[0])
        setUploading(false)
    } catch (e) {
        console.error(e);
        setUploading(false);
    }
}