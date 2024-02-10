/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import styledComponents from 'styled-components';

const RadingDiv = styledComponents.div`
  i.input:hover {
    cursor: pointer;
    color: #FE9445;
  }

  &.rating__size--sm {
    i {
      font-size: 16px;
      letter-spacing: 3px;
    }

    button{
      font-size: 16px;
      position: relative;
      top: -2px;
    }
  }

  &.rating__size--md {
    i {
      font-size: 24px;
      letter-spacing: 6px;
    }

    button{
      font-size: 20px;
      position: relative;
      top: -4px;
    }
  }

  &.rating__size--lg {
    i {
      font-size: 32px;
      letter-spacing: 9px;
    }

    button{
      font-size: 24px;
      position: relative;
      top: -6px;
    }
  }

  &.rating__size--xl{
    i {
      font-size: 40px;
      letter-spacing: 12px;
    }

    button{
      font-size: 28px;
      position: relative;
      top: -8px;
    }
  }
`;

const ParentDiv = styledComponents.div`
  border: unset;
  padding-left: 0;
  display: inline-block;

  &.form-control.is-invalid, .was-validated .form-control:invalid {
    border: unset;
  }
`;

export default function Index(payload) {
  const {
    id,
    className,
    defaultValues = 0,
    onChange,
    readonly = false,
    value = 0,
    size,
  } = payload;

  const [stars, setStars] = useState(0);
  const [sizeClass, setSizeClass] = useState(null);

  useEffect(() => {
    switch (size) {
      case 'md': setSizeClass('rating__size--md');
        break;

      case 'lg': setSizeClass('rating__size--lg');
        break;

      case 'xl': setSizeClass('rating__size--xl');
        break;

      default: setSizeClass('rating__size--sm');
    }
  }, [size]);

  useEffect(() => {
    setStars(value || defaultValues);

    if (onChange) {
      onChange(value || defaultValues);
    }
  }, [value, defaultValues]);

  const onClick = useCallback((val) => {
    if (!readonly) {
      setStars(val);

      if (onChange) {
        onChange(val);
      }
    }
  });

  const clearStars = useCallback(() => {
    setStars(undefined);

    if (onChange) {
      onChange(undefined);
    }
  }, [onChange, setStars]);

  return (
    <ParentDiv className={className}>
      <RadingDiv id={id} className={`rating ${sizeClass}`}>
        <i
          className={`fas fa-star ${stars >= 1 && 'filled'} ${!readonly ? 'input' : ''}`}
          onClick={() => onClick(1)}
        />
        <i
          className={`fas fa-star ${stars >= 2 && 'filled'} ${!readonly ? 'input' : ''}`}
          onClick={() => onClick(2)}
        />
        <i
          className={`fas fa-star ${stars >= 3 && 'filled'} ${!readonly ? 'input' : ''}`}
          onClick={() => onClick(3)}
        />
        <i
          className={`fas fa-star ${stars >= 4 && 'filled'} ${!readonly ? 'input' : ''}`}
          onClick={() => onClick(4)}
        />
        <i
          className={`fas fa-star ${stars >= 5 && 'filled'} ${!readonly ? 'input' : ''}`}
          onClick={() => onClick(5)}
        />

        {!readonly && (
          <Button variant="link" onClick={clearStars}>
            <FontAwesomeIcon icon={solid('ban')} />
          </Button>
        )}

      </RadingDiv>
    </ParentDiv>
  );
}
