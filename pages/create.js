import React, { Component, Fragment } from 'react';
import { useForm } from 'react-hook-form';
import base from '../lib/db';
import { auth } from '../lib/db';
import * as firebase from 'firebase';

import { useRouter } from 'next/router';

export default function Create() {
  const router = useRouter();

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    data['userId'] = window.user.uid;
    data['createdAt'] = firebase.firestore.FieldValue.serverTimestamp();

    console.log('data', data);

    base.addToCollection('pushups', data).then(function () {
      router.push('/');
    });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}

        <div className="field">
          <label className="label">Activity</label>
          <div className="select">
            <select name="activity" ref={register}>
              <option value="pushup">Pushup</option>
              <option value="sun-salutation-a">Sun Salutation A</option>
              <option value="sun-salutation-b">Sun Salutation B</option>
            </select>
          </div>
        </div>

        {/* include validation with required or other standard HTML validation rules */}

        <div className="field">
          <label className="label">Count</label>
          <div className="control">
            <input
              className="input"
              name="count"
              ref={register({ required: true })}
            />
            {/* errors will return when field validation fails  */}
            {errors.count && <span>This field is required</span>}{' '}
          </div>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button">Submit</button>
          </div>
          <div className="control">
            <button
              onClick={() => router.push('/')}
              className="button is-link is-light"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
