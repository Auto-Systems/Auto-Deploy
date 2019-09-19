import React, { FunctionComponent } from 'react';
import cx from 'clsx';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Icon from 'UI/Components/Style/MUI-Treasury/Icon';
import { useStyles } from './Styles';

interface LinkTagProps {
  className?: string;
  icon?: string | React.ReactNode;
  overline?: string;
  children: React.ReactNode;
}

const LinkTag: FunctionComponent<LinkTagProps> = ({ className, children, icon, overline, ...props }) => {
  const classes = useStyles();
  return (
    <Button className={cx('LinkTag-root', classes.root, className)} {...props} classes={{ label: classes.label }}>
      {overline ? (
        <div>
          <span className={cx('LinkTag-overline', classes.overline)}>{overline}</span>
          {children}
        </div>
      ) : (
        children
      )}
      {typeof icon === 'string' ? <Icon className={classes.icon}>{icon}</Icon> : <Icon className={classes.icon}>{icon}</Icon>}
    </Button>
  );
};

LinkTag.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  icon: PropTypes.string,
  overline: PropTypes.string
};
LinkTag.defaultProps = {
  className: '',
  icon: '',
  overline: ''
};

export default LinkTag;
