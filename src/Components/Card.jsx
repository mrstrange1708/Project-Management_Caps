import React from 'react';
import styled from 'styled-components';
import { X, Edit } from 'lucide-react';

const Card = ({ id, title, description, status, start, end, priority, deadline, onDelete, onEdit }) => {

  return (
    <StyledWrapper>
      <div className="notification " data-priority={priority}>
        <div className="card-actions">
          <button className="edit-btn" onClick={() => onEdit && onEdit(id)} title="Edit Project">
            <Edit size={16} />
          </button>
          <button className="delete-btn" onClick={() => onDelete && onDelete(id)} title="Delete Project">
            <X size={16} />
          </button>
        </div>
        <div className="notiglow bg-color" />
        <div className="notiborderglow" />
        {title && <div className="notititle">{title}</div>}
        <div className="notibody">
          {description && <div>{description}</div>}
          {status && <div>Status: {status}</div>}
          {start && <div>Start: {new Date(start).toLocaleDateString()}</div>}
          {end && <div>End: {new Date(end).toLocaleDateString()}</div>}
          {deadline && <div>Deadline: {new Date(deadline).toLocaleDateString()}</div>}
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .notification {
    display: flex;
    flex-direction: column;
    isolation: isolate;
    position: relative;
    width: 18rem;
    height: 11rem;
    background: #29292c;
    border-radius: 1rem;
    overflow: hidden;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 16px;
    --gradient: linear-gradient(to bottom, #2eadff, #3d83ff, #7e61ff);
    --color: #32a6ff
  }

  .notification:before {
    position: absolute;
    content: "";
    inset: 0.0625rem;
    border-radius: 0.9375rem;
    background: #29292c;
    z-index: 2
  }

  .notification:after {
    position: absolute;
    content: "";
    width: 0.25rem;
    inset: 0.65rem auto 0.65rem 0.5rem;
    border-radius: 0.125rem;
    background: var(--gradient);
    transition: transform 300ms ease;
    z-index: 4;
  }

  .notification[data-priority='Easy']:after {
    background: linear-gradient(to bottom, #2ecc71, #27ae60); /* Green */
  }

  .notification[data-priority='Medium']:after {
    background: linear-gradient(to bottom, #f39c12, #e67e22); /* Light Orange */
  }

  .notification[data-priority='Hard']:after {
    background: linear-gradient(to bottom, #e74c3c, #c0392b); /* Red */
  }

  .notification:hover:after {
    transform: translateX(0.15rem)
  }

  .notititle {
    color: var(--color);
    padding: 0.65rem 0.25rem 0.4rem 1.25rem;
    font-weight: 500;
    font-size: 1.1rem;
    transition: transform 300ms ease;
    z-index: 5;
  }

  .notification:hover .notititle {
    transform: translateX(0.15rem)
  }

  .notibody {
    color: #99999d;
    padding: 0 1.25rem;
    transition: transform 300ms ease;
    z-index: 5;
  }

  .notification:hover .notibody {
    transform: translateX(0.25rem)
  }

  .notiglow,
  .notiborderglow {
    position: absolute;
    width: 20rem;
    height: 20rem;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle closest-side at center, white, transparent);
    opacity: 0;
    transition: opacity 300ms ease;
  }

  .notiglow {
    z-index: 3;
  }

  .notiborderglow {
    z-index: 1;
  }

  .notification:hover .notiglow {
    opacity: 0.1
  }

  .notification:hover .notiborderglow {
    opacity: 0.1
  }

  .note {
    color: var(--color);
    position: fixed;
    top: 80%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    font-size: 0.9rem;
    width: 75%;
  }

  .card-actions {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    display: flex;
    gap: 0.5rem;
    z-index: 6;
  }

  .delete-btn {
    background: transparent;
    border: none;
    color: #999;
    cursor: pointer;
  }

  .delete-btn:hover {
    color: #fff;
  }

  .edit-btn {
    background: transparent;
    border: none;
    color: #999;
    cursor: pointer;
  }

  .edit-btn:hover {
    color: #fff;
  }
`;

export default Card;