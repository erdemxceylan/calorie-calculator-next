import { Column } from 'primereact/column';

export default function Edition({ header }) {
   return (
      <Column
         header={header}
         headerStyle={{ width: '8rem', minWidth: '8rem' }}
         bodyStyle={{ textAlign: 'center' }}
      />
   );
}