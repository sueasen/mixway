import * as Types from '@/app/functions/types';

export function toStringLatLng(latLng: Types.LatLng) {
  return `${latLng.lat},${latLng.lng}`;
}

export function toStringLatLngArray(latLngs: Types.LatLng[]) {
  return latLngs.map((latLng) => toStringLatLng(latLng)).join(':');
}
