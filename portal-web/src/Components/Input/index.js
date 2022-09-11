import { WarpInput, InputStyled } from './styles';

export default function Input({ isErroStyle, placeholderString, value, onChange, type = 'text' }) {

    return (
        <WarpInput error={isErroStyle}>
            <InputStyled placeholder={placeholderString} type={type} value={value} onChange={onChange} />
        </WarpInput>
    );
}