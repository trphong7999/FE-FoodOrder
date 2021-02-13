import React from 'react'
import Pricing from '../Pricing'
import Section from '../Section'
import {homeObjOne} from './Data'

export default function Home() {
    return (
        <div>
            <Section {...homeObjOne}/>
            <Section {...homeObjOne}/>
            <Section {...homeObjOne}/>
            <Section {...homeObjOne}/>
            <Pricing/>
            <Section {...homeObjOne}/>
        </div>
    )
}
