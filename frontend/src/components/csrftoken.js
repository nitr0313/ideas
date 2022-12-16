import React from 'react';
import getCookie from '../lib/csrf_fetch'

const csrfToken = getCookie('csrftoken');

const CSRFToken = () => {
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
    );
};
export default CSRFToken;
