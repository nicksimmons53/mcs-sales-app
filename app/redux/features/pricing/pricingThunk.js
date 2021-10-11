import { createAsyncThunk } from '@reduxjs/toolkit';
import Pricing from '../../../api/Pricing';

export const getCountertopOptions = createAsyncThunk(
  'pricing/getCountertopOptions',
  async ( ) => {
    const response = await Pricing.getCountertopOptions( );
    let colors = response.colors.map((value, index) => { 
      return { 
        label: value.color, 
        value: value.color
      }
    });

    let types = response.types.map((value, index) => {
      return {
        label: value.type,
        value: value.type
      }
    });

    let values = { colors, types };

    return values;
  }
);

export const getClientParts = createAsyncThunk(
  'pricing/getClientParts',
  async (id) => {
    const response = await Pricing.getClientParts(id);

    let carpet = response.parts.filter(row => row.program === "Carpet");
    let countertops = response.parts.filter(row => row.program === "Countertops");
    let tile = response.parts.filter(row => row.program === "Tile");
    let vinyl = response.parts.filter(row => row.program === "LVP");
    let wood = response.parts.filter(row => row.program === "Wood");

    parts = {
      carpet: carpet,
      countertops: countertops,
      tile: tile,
      vinyl: vinyl,
      wood: wood 
    };

    return parts;
  }
);

export const createClientParts = createAsyncThunk(
  'pricing/createClientParts',
  async (values) => {
    const response = await Pricing.createClientParts(values);

    return response;
  }
);

export const deleteClientParts = createAsyncThunk(
  'pricing/deleteClientParts',
  async (id) => {
      const response = await Pricing.deleteClientParts(id);

      return response;
  }
);