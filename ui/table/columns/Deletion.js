import { Column } from 'primereact/column';

export default function Deletion({ body }) {
   return (
      <Column
         header='Delete'
         headerStyle={{ width: '5rem', minWidth: '5rem' }}
         bodyStyle={{ textAlign: 'center' }}
         body={body}
      />
   );
}