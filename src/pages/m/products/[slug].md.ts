import type { APIRoute } from 'astro';
import { productDoc } from '../../../lib/mirror';
import { product } from '../../../data/products';

// 第一方产品页的 Markdown 镜像：/m/products/<slug>.md
export const prerender = true;

export function getStaticPaths() {
  return [{ params: { slug: product.slug } }];
}

export const GET: APIRoute = async ({ site: base }) => {
  const root = base ?? new URL('https://orangeknows.com');
  return new Response(productDoc(root), {
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
};
