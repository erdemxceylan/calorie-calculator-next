import { InputText } from 'primereact/inputtext';

export default function MyInput(props) {
   // console.log(props);
   // const { name, onChange, ...rest } = props;
   return (
      <InputText {...props} />
   );
}