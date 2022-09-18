import { useRouter } from 'next/router';
import { useState } from 'react';
import { CONSTANTS } from '../global/constants';

const { DELAY } = CONSTANTS;

export default function useSubmit() {
   const [isSubmitted, setIsSubmitted] = useState(false);
   const router = useRouter();

   async function submitHandler(url, method, body, requestHandler, successActions, onHide, route) {
      await requestHandler({ url, method, body }, () => {
         setIsSubmitted(true);
         !!successActions && successActions();
         setTimeout(() => onHide(), DELAY);
         setTimeout(() => setIsSubmitted(false), DELAY * 2);
         !!route && router.push(route);
      });
   }

   return { isSubmitted, submitHandler };
}