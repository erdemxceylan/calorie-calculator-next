import { Column } from 'primereact/column';

export default function Numbers({ body }) {
   return (
      <Column
         header='No'
         headerStyle={{ width: '2rem', minWidth: '2rem' }}
         bodyStyle={{ textAlign: 'center' }}
         body={body}
      />
   );
}