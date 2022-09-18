import { useRouter } from 'next/router';
import { useState } from 'react';
import { CONSTANTS } from '../global/constants';

const { DELAY } = CONSTANTS;

export default function useSubmit() {
   const [isSubmitted, setIsSubmitted] = useState(false);
   const router = useRouter();

   async function submitHandler(url, method, body, requestHandler, successActions, onHide, route) {
      await requestHandler({ url, method, body }, async data => {
         !!successActions && await successActions(data);
         !!route && router.push(route);
         setIsSubmitted(true);
         setTimeout(() => {
            onHide();
            setTimeout(() => setIsSubmitted(false), DELAY * 2);
         }, DELAY);
      });
   }

   return { isSubmitted, submitHandler };
}