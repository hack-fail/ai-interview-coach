import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import LandingPage from '../pages/LandingPage'
import UploadPage from '../pages/UploadPage'
import InterviewPage from '../pages/InterviewPage'
import EvaluationPage from '../pages/EvaluationPage'
import NotFoundPage from '../pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true,       element: <LandingPage /> },
      { path: 'upload',    element: <UploadPage /> },
      { path: 'interview', element: <InterviewPage /> },
      { path: 'evaluation',element: <EvaluationPage /> },
      { path: '*',         element: <NotFoundPage /> },
    ],
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
