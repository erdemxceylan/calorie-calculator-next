import { Column } from 'primereact/column';

export default function Deletion({ header, body }) {
   return (
      <Column
         header={header}
         headerStyle={{ width: '5rem', minWidth: '5rem' }}
         bodyStyle={{ textAlign: 'center' }}
         body={body}
      />
   );
}