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
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content={description} />
            <meta name="keywords" content={description} />

            <meta
                property="og:type"
                content="에프엔에프, 축구, 축구소식, 최신축구소식, 피파, 피파온라인, 에펨, 축구커뮤니티"
            />
            <meta property="og:title" content={title} />
            <meta property="og:site_name" content={title} />
            <meta property="og:description" content={description} />

            <link rel="shortcut icon" href="/img/favicon.ico" />
            {/*         <meta property="og:image" content={props.imgsrc} />
        <meta property="og:url" content={props.url} /> */}

            {/*  <link rel="canonical" href={props.url} /> */}
        </Helmet>
    );
};

export default MetaTag;
