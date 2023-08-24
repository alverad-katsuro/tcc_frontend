"use client";
import { Checkbox, Dropdown } from "flowbite-react";


export default function MultipleSelectCheckmarks() {


    return (
        <div>
            <Dropdown
                label="Small dropdown"
                size="sm"
                color="blue"
                dismissOnClick={false}
            >
                <Dropdown.Item className="flex gap-4" >
                    <Checkbox />
                    asdasdsd
                </Dropdown.Item>
            </Dropdown>
        </div>
    );
}
