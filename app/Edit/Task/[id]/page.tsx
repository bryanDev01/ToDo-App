// app/Edit/Task/[id]/page.tsx
import { pageProps } from '@/types/types';
import dynamic from 'next/dynamic';

const NewTasks = dynamic(() => import('@/app/newTask/page'));

export default function EditTaskPage({ params }: pageProps) {
  return <NewTasks params={params}/>;
}