import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect, useLocation } from 'react-router-dom';
import '../App.css';

const Result = () => {
    let location = useLocation();
    const [redirectEdit, setRedirectEdit] = useState(false);
    const { isSuccess, msg, data } = location.state || {};
    const { longUrl, shortUrl, shortCode, date } = data || {};

    if (redirectEdit) {
        return <Redirect to={'/url/edit/' + shortCode} />;
    }

    return (
        <>
            <div className={'m-5 ' + (isSuccess ? 'success' : 'fail')}>
                <h2>{isSuccess ? 'Success!' : 'Failed!'}</h2>
                <p>{msg}</p>
                {data && (
                    <div>
                        <p>Long URL: {longUrl}</p>
                        <p>
                            Short URL: <a href={shortUrl}>{shortUrl}</a>
                        </p>
                        <p>Created at: {date}</p>
                    </div>
                )}
            </div>
            {isSuccess && data && (
                <div className="m-5 editBlock">
                    <h5>Edit your URL!</h5>
                    <Button
                        className={'btn-lg btn-warning'}
                        onClick={() => setRedirectEdit(true)}>
                        Edit
                    </Button>
                </div>
            )}
        </>
    );
};
export default Result;
