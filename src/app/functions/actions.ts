'use server';
import { redirect } from 'next/navigation';
import logger from '@/lib/logger';
import * as Types from '@/app/functions/types';
import * as Utils from '@/app/functions/utils';

const mixwayApiKey = process.env.MIXWAY_API_KEY || '';

export async function stations(formData: FormData) {
  const { name } = Object.fromEntries(formData.entries());
  fetchMixwayApiStation(String(name));
  redirect('/');
}

export async function courses(formData: FormData) {
  const { start, end } = Object.fromEntries(formData.entries());
  console.log(start + ':' + end);

  const startLatLng = await fetchNominatimApiLatLng(String(start));
  const endLatLng = await fetchNominatimApiLatLng(String(end));
  console.log(startLatLng + ':' + endLatLng);

  fetchMixwayApiCourse([startLatLng, endLatLng]);

  redirect('/');
}

export async function fetchNominatimApiLatLng(q: string) {
  const json = await fetchNominatimApi(q);
  return { lat: json[0].lat, lng: json[0].lon };
}

export async function fetchApi(url: string) {
  console.log(url);
  const response = await fetch(url);
  const json = await response.json();
  logger.info(json);
  return json;
}

export async function fetchNominatimApi(q: string) {
  console.log(q);
  const params: Record<string, string> = {
    format: 'json',
    q: q,
  };
  const url = `https://nominatim.openstreetmap.org/search?${new URLSearchParams(
    params
  )}`;
  return await fetchApi(url);
}

export async function fetchMixwayApiStation(name: string) {
  console.log(name);
  const params: Record<string, string> = {
    key: mixwayApiKey,
    name: String(name),
    type: 'train',
  };
  const url = `https://mixway.ekispert.jp/v1/json/station?${new URLSearchParams(
    params
  )}`;
  return await fetchApi(url);
}

export async function fetchMixwayApiCourse(latLngs: Types.LatLng[]) {
  const params: Record<string, string> = {
    key: mixwayApiKey,
    viaList: Utils.toStringLatLngArray(latLngs),
  };
  const url = `https://mixway.ekispert.jp/v1/json/search/course/extreme?${new URLSearchParams(
    params
  )}`;
  console.log(url);
  return await fetchApi(url);
}
