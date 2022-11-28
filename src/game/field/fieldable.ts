import {FieldTypes} from "./fieldTypes";
import Playerable from "../player/playerable";

export default interface Fieldable{
    getUpper: () => Fieldable | null;
    getLower: () => Fieldable | null;
    getLeft: () => Fieldable | null;
    getRight: () => Fieldable | null;

    getFieldType: () => FieldTypes;
    isOccupied: () => boolean;
    isOccupiedFrom: () => Playerable;

    getFieldCoordinates: () => [number,number];

    equals: () => boolean;
    toString: () => string;
}