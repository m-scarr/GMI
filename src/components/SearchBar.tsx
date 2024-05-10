import React, { useEffect, useState } from 'react'
import TextInput from './inputs/TextInput'
import { observer } from 'mobx-react-lite';
import AppState from '../state/AppState';
import { refData } from '../state/types';

type Props = {}

const SearchBar = (_props: Props) => {
    //const [searchValue, setSearchValue] = useState(AppState.instance.searchValue);
    //useEffect(() => {
    //    AppState.instance.searchValue = searchValue;
    //}, [searchValue]);
    return AppState.instance.currentCategory === null ? null : (
        <div style={{ padding: 1, borderBottom: "2px solid white", backgroundColor: (refData as any)[AppState.instance.currentCategory].color }}>
            <TextInput
                placeholder={`Search ${(refData as any)[AppState.instance.currentCategory].plural}`}
                color={(refData as any)[AppState.instance.currentCategory].color}
                value={AppState.instance.searchValue}
                onInput={(val: any) => { AppState.instance.searchValue = val; }}
                fontSize={24} />
        </div>
    )
}

export default observer(SearchBar);