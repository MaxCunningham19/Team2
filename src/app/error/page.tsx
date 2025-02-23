import React from 'react';

export default function ErrorPage()
{
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Oops! Something went wrong.</h1>
            <p>We're sorry, but the page you were looking for doesn't exist.</p>
            <a href="/">Go back to the homepage</a>
        </div>
    );
};