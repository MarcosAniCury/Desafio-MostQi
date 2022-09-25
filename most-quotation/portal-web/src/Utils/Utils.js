export const getBase64 = (file, setImageState) => {
    let reader = new FileReader();
    reader.onload = () => {
        setImageState(reader.result);
    };
    reader.readAsDataURL(file);
};