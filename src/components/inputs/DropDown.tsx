import { useEffect, useState } from 'react'
import TextInput from './TextInput';

type Props = { value: number | null, options: { id: number | null, name: string }[], searchValuePlaceHolder?: string, onInput: (val: number | null) => void, fontSize?: number }

export default function DropDown(props: Props) {
    const [searchValue, setSearchValue] = useState<string>("");
    const [showDropDown, setShowDropDown] = useState<boolean>(false);


    const findSelectedOption = () => {
        for (let i = 0; i < props.options.length; i++) {
            if (props.options[i].id === props.value) {
                return props.options[i];
            }
        }
        return null;
    }

    useEffect(() => {
        setValue(findSelectedOption());
    }, [props.value])

    const [value, setValue] = useState<{ id: number | null, name: string } | null>(findSelectedOption());


    return (
        <>
            <div style={{ display: "flex", flexDirection: "row", backgroundColor: "rgba(0, 0, 0, .5)", border: "4px solid rgba(255, 255, 255, .4)" }} onClick={() => { setShowDropDown(!showDropDown) }}>
                <div style={{ width: "100%", fontSize: props.fontSize || 24, alignContent: "center" }}>{value ? value.name : 'None'}</div>
                <img alt="" src={`./assets/${showDropDown ? 'up' : 'down'}.png`} />
            </div>
            {showDropDown ?
                <>
                    <div style={{ position: "fixed", left: 0, right: 0, top: 0, bottom: 0 }} onClick={() => { setShowDropDown(false); }} />
                    <div style={{ position: "relative", zIndex: 10 }}>
                        <div style={{
                            position: "absolute",
                            backgroundColor: "rgba(0, 0, 0, .95)",
                            width: "calc(100% - 16px)",
                            left: 4,
                            border: "4px solid rgba(255, 255, 255, .4)",
                            top: -4
                        }}>
                            <div style={{ width: "calc(100%)" }}>
                                <TextInput value={searchValue} onInput={setSearchValue} fontSize={props.fontSize || 24} placeholder={props.searchValuePlaceHolder ? props.searchValuePlaceHolder : 'Search...'} />
                            </div>
                            <div style={{ height: 240, overflowY: "scroll" }}>
                                {props.options.map((option: { id: number | null, name: string }) => {
                                    return option.name.includes(searchValue) ? <div key={option.name + "-" + option.id} className="hoverable">
                                        <div style={{
                                            backgroundColor: "rgba(255, 255, 255, .15)",
                                            marginTop: 8,
                                            marginBottom: 8,
                                            borderTop: "1px solid white",
                                            borderBottom: "1px solid white",
                                            paddingTop: 4,
                                            paddingBottom: 4,
                                            fontSize: props.fontSize || 24
                                        }}
                                            onClick={() => { console.log(option); props.onInput(option.id); setShowDropDown(false); }}
                                        >
                                            {option.name}
                                        </div>
                                    </div> : null
                                })}
                            </div>
                        </div>
                    </div>
                </>
                : null
            }
        </>
    )
}