import { Column } from 'primereact/column';

export default function Edition() {
   return (
      <Column
         header='Edit'
         rowEditor headerStyle={{ width: '8rem', minWidth: '8rem' }}
         bodyStyle={{ textAlign: 'center' }}
      />
   );
}