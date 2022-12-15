import React from 'react';
import { Helmet } from 'react-helmet-async';

interface IProps {
    readonly title: string;
    readonly description: string;
}

const MetaTag = ({ title, description }: IProps) => {
    return (
        <Helmet>
            <title>{title}</title>

            {/*    <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} /> */}

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:site_name" content={title} />
            <meta property="og:description" content={description} />

            {/*         <meta property="og:image" content={props.imgsrc} />
        <meta property="og:url" content={props.url} /> */}

            {/*     <meta name="twitter:title" content={props.title} />
        <meta name="twitter:description" content={props.description} />
        <meta name="twitter:image" content={props.imgsrc} /> */}

            {/*  <link rel="canonical" href={props.url} /> */}
        </Helmet>
    );
};

export default MetaTag;
