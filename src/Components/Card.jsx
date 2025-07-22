import React from 'react';
import { Clock, Calendar, AlertCircle, CheckCircle2, Circle, Trash2, Edit2, ArrowRight } from 'lucide-react';
import { useContext } from 'react';
import { TheamContext } from '../App';

const Card = ({ 
  id, 
  title, 
  description, 
  status, 
  start, 
  end, 
  priority, 
  deadline,
  onDelete,
  onEdit 
}) => {
  const { theam } = useContext(TheamContext);

  const priorityConfig = {
    Easy: {
      icon: <CheckCircle2 className="text-green-500" size={18} />,
      color: 'bg-green-500',
      textColor: 'text-green-500'
    },
    Medium: {
      icon: <Circle className="text-orange-500" size={18} />,
      color: 'bg-orange-500',
      textColor: 'text-orange-500'
    },
    Hard: {
      icon: <AlertCircle className="text-red-500" size={18} />,
      color: 'bg-red-500',
      textColor: 'text-red-500'
    }
  };

  const statusColors = {
    current: 'bg-blue-500',
    completed: 'bg-green-500'
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      className={`
        ${theam ? 'bg-gray-800/50' : 'bg-white/50'} 
        backdrop-blur-md rounded-xl border 
        ${theam ? 'border-gray-700/50' : 'border-gray-200/50'}
        transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
        relative overflow-hidden
      `}
    >

      <div className={`absolute top-0 left-0 w-1 h-full ${priorityConfig[priority]?.color}`} />

      <div className="p-6">

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {priorityConfig[priority]?.icon}
            <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          </div>
          <div className={`px-3 py-1 text-xs rounded-full ${statusColors[status]} text-white`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </div>
        </div>


        <p className={`text-sm mb-4 line-clamp-2 ${theam ? 'text-gray-400' : 'text-gray-600'}`}>
          {description}
        </p>


        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="opacity-50" />
            <span className={`text-xs ${theam ? 'text-gray-400' : 'text-gray-600'}`}>
              {formatDate(start)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="opacity-50" />
            <span className={`text-xs ${theam ? 'text-gray-400' : 'text-gray-600'}`}>
              {formatDate(deadline)}
            </span>
          </div>
        </div>


        <div className="flex items-center justify-between mt-4 pt-4 border-t ${theam ? 'border-gray-700/50' : 'border-gray-200/50'}">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(id)}
              className={`p-2 rounded-lg transition-colors ${
                theam 
                  ? 'hover:bg-gray-700/50' 
                  : 'hover:bg-gray-100/50'
              }`}
            >
              <Edit2 size={16} className="text-blue-500" />
            </button>
            <button
              onClick={() => onDelete(id)}
              className={`p-2 rounded-lg transition-colors ${
                theam 
                  ? 'hover:bg-gray-700/50' 
                  : 'hover:bg-gray-100/50'
              }`}
            >
              <Trash2 size={16} className="text-red-500" />
            </button>
          </div>
          
          <div className={`flex items-center gap-1 text-xs ${priorityConfig[priority]?.textColor}`}>
            <span className="font-medium">{priority}</span>
            <ArrowRight size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;