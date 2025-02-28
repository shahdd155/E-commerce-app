import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
 
  {
    path:  'brands/:specficbrandtid',
    renderMode: RenderMode.Client
  },
  {
    path:  'checkout/:id',
    renderMode: RenderMode.Client
  },
  {
    path:  'details/:specficProductId',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
