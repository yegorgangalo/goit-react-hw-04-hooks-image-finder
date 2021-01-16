import React from 'react';
import s from './Notification.module.css'

export default function Notification({text}) {
    return <h1 className={s.info}>{text}</h1>
}