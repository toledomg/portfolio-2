// src/components/ProjectSites.tsx

import React from 'react';
import { Text } from '@/styles/Text';
import { FaLink } from 'react-icons/fa';
import {
  Project as ProjectWrapper,
  ProjectTitle,
  ProjectStack,
  ProjectStackTech,
  ProjectLink,
  ProjectLinks,
} from '../Project/style';

interface ProjectSitesProps {
  projectSites: {
    [key: string]: {
      url: string;
      language: string;
      description: string;
    };
  };
}

const ProjectSites: React.FC<ProjectSitesProps> = ({ projectSites }) => {
  return (
    <>
      {Object.entries(projectSites).map(([projectName, projectDetails]) => (
        <ProjectWrapper key={projectName}>
          <ProjectTitle
            as="h2"
            type="heading3"
            css={{ marginBottom: '$3' }}
            color="grey4">
            {projectName}
          </ProjectTitle>

          <ProjectStack>
            <Text type="body2" color="grey2">
              Linguagem:
            </Text>
            <ProjectStackTech>
              <Text color="grey2" type="body2">
                {projectDetails.language}
              </Text>
            </ProjectStackTech>
          </ProjectStack>

          <Text type="body1" color="grey2">
            {projectDetails.description}
          </Text>

          <ProjectLinks>
            <ProjectLink target="_blank" href={projectDetails.url}>
              <FaLink /> Ver site
            </ProjectLink>
          </ProjectLinks>
        </ProjectWrapper>
      ))}
    </>
  );
};

export default ProjectSites;
