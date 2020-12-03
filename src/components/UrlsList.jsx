import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Row } from 'react-bootstrap';
import Axios from 'axios';

const UrlsList = () => {
    const [list, setList] = useState([]);
    const [redirect, setRedirect] = useState();
    const getAll = () => {
        Axios.get('https://url-shortener-back-end.herokuapp.com/api/url/all')
            .then(response => {
                setList(response.data);
            })
            .catch(err => {
                console.log(err);
                setRedirect({ path: '/result' });
            });
    };

    const clickEdit = urlCode => {
        console.log(urlCode);
        setRedirect({ path: '/url/edit/' + urlCode });
    };

    useEffect(() => {
        getAll();
    }, []);

    if (redirect) {
        const { path, result } = redirect;
        return <Redirect to={{ pathname: path, state: result }} />;
    }

    return (
        <>
            <div className="row py-5">
                <div className="col-lg-10 mx-auto">
                    <div className="table-responsive">
                        <table className="table table-striped table-bordered">
                            <thead className="thead-light">
                                <tr className="placeholder">
                                    <th>ID</th>
                                    <th>Long URL</th>
                                    <th>Short URL</th>
                                    <th>Date</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map(url => {
                                    const date = new Date(url.date);
                                    return (
                                        <tr key={url.shortCode}>
                                            <td>{url._id}</td>
                                            <td>{url.longUrl}</td>
                                            <td>
                                                <a href={url.shortUrl}>
                                                    {url.shortUrl}
                                                </a>
                                            </td>
                                            <td>{date.toUTCString()}</td>
                                            <td className="editButtom">
                                                <Row className="flex align-content-center ml-2 mr-2">
                                                    <Button
                                                        size="sm"
                                                        className="btn-dark"
                                                        onClick={() =>
                                                            clickEdit(
                                                                url.shortCode
                                                            )
                                                        }>
                                                        Edit
                                                    </Button>
                                                </Row>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};
export default UrlsList;
