import React, { useEffect, useContext, useRef, useState } from "react";
import { TheamContext, userContext } from "../App";
import gsap from "gsap";
import BackgroundAnimation from "../services/BackgroundAnimation";
import Card from "../Components/Card";
import ActivityBar from "../Components/AcivityBar";
import { fetchProjects, createProject } from '../services/projectService';

const Dashboard = () => {

  const { theam } = useContext(TheamContext);
  const { userdata } = useContext(userContext);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const letters = textRef.current?.querySelectorAll(".letter") || [];
    letters.forEach((letter) => {
      letter.addEventListener("mouseenter", () => {
        gsap.to(letter, {
          duration: 1,
          y: -20,
          opacity: 0,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(letter, { y: 0, opacity: 1 });
          },
        });
      });
    });
  }, [theam]);

  const DustText = () => {
    const text = "Task Flow";
    return (
      <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-center ml-0 md:ml-0 lg:-ml-72" ref={textRef}>
        {text.split("").map((char, index) => (
          <span key={index} className="letter inline-block mx-1 cursor-pointer">
            {char}
          </span>
        ))}
      </h1>
    );
  };

  useEffect(() => {
    // Fetch projects from backend on mount
    const loadProjects = async () => {
      try {
        const response = await fetchProjects();
        const data = response.data || response;
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };
    
    loadProjects();
  }, []);

  const loadSampleProjects = async () => {
    setIsLoading(true);
    try {
      // Fetch sample data from the API
      const res = await fetch("https://mocki.io/v1/972ded65-f2d8-4f83-bde6-4ba29350497b");
      const sampleData = await res.json();
      
      // Save each sample project to the database
      for (const sampleProject of sampleData) {
        try {
          // Prepare the project data for backend
          const projectData = {
            title: sampleProject.title,
            description: sampleProject.description,
            priority: sampleProject.priority,
            status: sampleProject.status,
            start: sampleProject.start,
            starttime: sampleProject.starttime,
            end: sampleProject.end,
            endtime: sampleProject.endtime,
            deadline: sampleProject.deadline
          };
          
          await createProject(projectData);
        } catch (error) {
          console.error(`Failed to create sample project ${sampleProject.title}:`, error);
        }
      }
      
      // Refresh the projects list
      const response = await fetchProjects();
      const data = response.data || response;
      setProjects(data);
      
    } catch (err) {
      console.error('Failed to load sample projects:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={theam ? { color: "#fff" } : { color: "#000" }}
      className="relative flex flex-col items-center justify-start min-h-screen p-10 bg-cover bg-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <BackgroundAnimation />
      </div>
      <div
        className="hidden md:hidden lg:block absolute top-0 right-0 h-full w-70 p-4 shadow-lg z-10 "
        style={
          theam
            ? { backgroundColor: "#1a1a1a", color: "#fff" }
            : { backgroundColor: "#f4f4f4", color: "#000" }
        }
      >
        <ActivityBar projects={projects} />
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-2">Upcoming Deadlines</h2>
          <div className="space-y-2 text-sm">
            {Array.isArray(projects) &&
              projects
                .filter((project) => new Date(project.deadline) > new Date())
                .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
                .map((project) => (
                  <div
                    key={project._id}
                    className="border border-gray-400 rounded-xl p-2 pb-1 shadow-gray-700 mt-5"
                  >
                    <strong>{project.title}</strong>
                    <br />
                    <span className="text-xs">
                      Due: {new Date(project.deadline).toLocaleDateString()}
                    </span>
                  </div>
                ))}
          </div>
        </div>
      </div>
      <DustText />

      {(!projects || projects.length === 0) && (
        <button
          onClick={loadSampleProjects}
          disabled={isLoading}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10 ml-0 md:ml-0 lg:-ml-72 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? 'Loading Sample Projects...' : 'Load Sample Projects'}
        </button>
      )}


      <div className="flex flex-row flex-wrap gap-20 justify-center items-start mt-20 mr-0 md:mr-0  lg:mr-60 " >
        <div className="flex flex-col gap-6  items-center">
          <h1 className="text-3xl font-bold mb-8 ">Your Today's Events</h1>
          {Array.isArray(projects) &&
            projects.filter((project) => {
              const today = new Date().toISOString().split("T")[0];
              return project.start <= today && project.end >= today;
            }).length ? (
            <div className="flex flex-col gap-6 items-center">
              {projects
                .filter((project) => {
                  const today = new Date().toISOString().split("T")[0];
                  return project.start <= today && project.end >= today;
                })
                .map((event) => (
                  <Card
                    key={event._id}
                    id={event._id}
                    title={event.title}
                    description={event.description}
                    status={event.status}
                    start={event.start}
                    end={event.end}
                    priority={event.priority}
                    deadline={event.deadline}
                  />
                ))}
            </div>
          ) : (
            <p>No events found today.</p>
          )}
        </div>

        <div className="flex flex-col gap-6 items-center">

          <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
          {Array.isArray(projects) &&
            projects.filter((project) => {
              const today = new Date().toISOString().split("T")[0];
              return project.start > today;
            }).length ? (
            <div className="flex flex-col gap-6 items-center">
              {projects
                .filter((project) => {
                  const today = new Date().toISOString().split("T")[0];
                  return project.start > today;
                })
                .map((event) => (
                  <Card
                    key={event._id}
                    id={event._id}
                    title={event.title}
                    description={event.description}
                    status={event.status}
                    start={event.start}
                    end={event.end}
                    priority={event.priority}
                    deadline={event.deadline}
                  />
                ))}
            </div>
          ) : (
            <p>No upcoming events found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
