import { useState } from "react";
import { Button, Select, SelectOption } from "../components/ui/inputs";

const options = [
    { label: 'TypeScript', value: 'TypeScript' },
    { label: 'JavaScript', value: 'JavaScript' },
    { label: 'Python', value: 'Python' },
    { label: 'PHP', value: 'PHP' },
    { label: 'C#', value: 'C#' },
    { label: 'C++', value: 'C++' }
]

export const Home = () => {

    const [value, setValue] = useState<SelectOption | undefined>();

    const handleclick = () => {
        console.log('click')
    }

    const handleChangeSelect = (option: SelectOption | undefined) => {
        setValue(option);
    }

    return (
        <div className="w-3/4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-center text-white">
            <h1 className="font-semibold text-7xl">Game on!</h1>
            <div className="my-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas animi quas magni rerum nobis
                rem earum dignissimos voluptates quia quasi, molestiae beatae ipsa consequuntur explicabo
                similique eaque recusandae commodi natus?
            </div>
            <div>
                <Button onClick={handleclick}>
                    Go game
                </Button>
            </div>
            <Select
                className="mt-10"
                label="Choose your language"
                variant="outlined"
                value={value}
                options={options}
                onChange={(option) => handleChangeSelect(option as SelectOption | undefined)}
            />
        </div>
    )
}
