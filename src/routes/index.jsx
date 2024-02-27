import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import MainLayout from '@layouts/MainLayout/MainLayout';
import Home from '@pages/Home/Home';
import Detail from '@pages/Detail/Detail';
import TimMaiAm from '@pages/TimMaiAm/TimMaiAm';
import Register from '@pages/Register/Register';
import Login from '@pages/Login/Login';
import AdminLayout from '../layouts/AdminLayout/AdminLayout';
import Cases from '../pages/Cases/Cases';
import Adopts from '../pages/Adopts/Adopts';
import LazyLoad from '../utils/lazy';

console.log('routes/index.jsx');

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="*" element={<MainLayout />}>
      <Route path="*" element={LazyLoad(() => import('@pages/Home/Home'))} />
      <Route path="tim-mai-am">
        <Route path="cho-cho-di-chu" element={<TimMaiAm type="dog" />} />
        <Route path="meo-cho-di-chu" element={<TimMaiAm type="cat" />} />
        <Route path="thong-tin">
          <Route
            path=":petId"
            element={LazyLoad(() => import('@pages/Detail/Detail'))}
          />
        </Route>
        <Route path="*" element={<TimMaiAm />} />
      </Route>
      <Route
        path="dang-ky"
        element={LazyLoad(() => import('@pages/Register/Register'))}
      />
      <Route
        path="dang-nhap"
        element={LazyLoad(() => import('@pages/Login/Login'))}
      />
      <Route path="quan-ly" element={<AdminLayout />}>
        <Route
          path="cac-truong-hop"
          element={LazyLoad(() => import('@pages/Cases/Cases'))}
        />
        <Route
          path="don-xin-nhan-nuoi"
          element={LazyLoad(() => import('@pages/Adopts/Adopts'))}
        />
      </Route>
    </Route>
  )
);

function LoadRoute() {
  return <RouterProvider router={router}></RouterProvider>;
}

export { LoadRoute, router };

// export function LoadRoute() {

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="*" element={<MainLayout />}>
//           <Route path="*" element={<Home />}></Route>
//           <Route path="tim-mai-am">
//             <Route
//               path="cho-cho-di-chu"
//               element={<TimMaiAm type="dog" />}
//             ></Route>
//             <Route
//               path="meo-cho-di-chu"
//               element={<TimMaiAm type="cat" />}
//             ></Route>
//             <Route path="thong-tin">
//               <Route path=":petId" element={<Detail />}></Route>
//             </Route>
//             <Route path="*" element={<TimMaiAm />}></Route>
//           </Route>
//           <Route path="dang-ky" element={<Register />}></Route>
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }
