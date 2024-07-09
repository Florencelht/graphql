import React from 'react';
import {createRoot}  from 'react-dom/client';
import App from './09-graphql/01-query'

const container=document.getElementById("root")
const root=createRoot(container)
root.render(
    <App></App>  
)