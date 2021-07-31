import React, { memo } from 'react';

interface AvatarProps {
  url: string;
  name: string;
}

const Avatar = memo(({ url, name }: AvatarProps) => (
  <div>
    {!!url ? (
      <img src={url} alt="avatar" className="avatar-img" />
    ) : (
      <div className="avatar-txt">{name.charAt(0)}</div>
    )}
  </div>
));

export default Avatar;
