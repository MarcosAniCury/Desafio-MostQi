export const getBase64 = (file, setImageState) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setImageState(reader.result);
    }
};