import React from 'react'
import Section from '../Section'
import {homeObjOne} from './Data'

export default function Home() {
    return (
        <div>
            <Section {...homeObjOne}/>
        </div>
    )
}
