import Fieldable from "./Fieldable";
import {FieldTypes} from "./FieldTypes";
import Playerable from "../player/playerable";

export default class Field implements Fieldable {
    public static _fieldIdentifierCounter: number = 0;
    private _fieldIdentifier: number;
    private _upper: Fieldable | null;
    private _right: Fieldable | null;
    private _lower: Fieldable | null;
    private _left: Fieldable | null;

    private _fieldType: FieldTypes;
    private readonly _coordinates: [number, number];

    constructor(upper: Fieldable | null, right: Fieldable | null, lower: Fieldable | null, left: Fieldable | null, fieldType: FieldTypes) {
        if (upper === null && right === null && lower === null && left === null) {
            this._coordinates = [0, 0];
        } else if (upper !== null && left === null) {
            let temp = upper.getFieldCoordinates();
            temp[1]++;
            this._coordinates = temp;
        } else if (left !== null) {
            let temp = left.getFieldCoordinates();
            temp[0]++;
            this._coordinates = temp;
        } else {
            throw new Error("field constructor error with coordinates");
        }

        this._fieldType = fieldType;
        this._upper = upper;
        this._right = right;
        this._lower = lower;
        this._left = left;
        this._fieldIdentifier = Field._fieldIdentifierCounter++;
    }


    equals(): boolean {
        return false;
    }

    getFieldCoordinates(): [number, number] {
        return this._coordinates;
    }

    getFieldType(): FieldTypes {
        return this._fieldType;
    }

    getLeft(): Fieldable | null {
        return this._left;
    }

    getLower(): Fieldable | null {
        return this._lower;
    }

    getRight(): Fieldable | null {
        return this._right;
    }

    getUpper(): Fieldable | null {
        return this._upper;
    }

    isOccupied(): boolean {
        throw new Error("Not implemented yet");
        // return null;
    }

    isOccupiedFrom(): Playerable {
        throw new Error("Not implemented yet");
        // return undefined;
    }

    toString(): string {
        return JSON.stringify({
            ID: this._fieldIdentifier,
            COORDINATES: this._coordinates,
            UPPER: this._upper,
            RIGHT: this._right,
            LOWER: this._lower,
            LEFT: this._left
        });
    }
}