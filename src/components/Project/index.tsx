import {
  Project as ProjectWrapper,
  ProjectTitle,
  ProjectStack,
  ProjectStackTech,
  ProjectLink,
  ProjectLinks,
} from './style';

import { Text } from '@/styles/Text';
import { useEffect, useState } from 'react';
import { FaGithub, FaShare } from 'react-icons/fa';
import { userData } from '@/utils/userData';
import ProjectSites from '../ProjectLinkSite';

interface ReposType {
  id: number;
  name: string;
  language: string;
  description: string;
  html_url: string;
  homepage: string;
  archived: string;
  fork: string;
}

const projectSites = {
  'O Sorveteiro': {
    url: 'https://sorveteiro.app/',
    language: 'TypeScript',
    description: 'Um projeto incrível para gerenciar pedidos de sorveteiros.',
  },
  'Bank Bank': {
    url: 'https://bank-bank.vercel.app/',
    language: 'TypeScript',
    description: 'Uma plataforma financeira inovadora.',
  },
};

export const Project = (): JSX.Element => {
  const [repositories, setRepositories] = useState<ReposType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(
        `https://api.github.com/users/${userData.githubUser}/repos?sort=created&direction=desc`
      );

      const json = await data.json();

      // Filtra repositórios não arquivados e que não são forks
      const activeRepositories = json.filter(
        (repo: ReposType) => !repo.archived && !repo.fork
      );

      setRepositories(activeRepositories);

      return activeRepositories;
    };

    fetchData();
  }, []);

  return (
    <>
      <ProjectSites projectSites={projectSites} />
      {repositories &&
        repositories?.map?.((repository) => (
          <ProjectWrapper key={repository.id}>
            <ProjectTitle
              as="h2"
              type="heading3"
              css={{ marginBottom: '$3' }}
              color="grey4">
              {repository.name}
            </ProjectTitle>

            <ProjectStack>
              <Text type="body2" color="grey2">
                Linguagem:
              </Text>
              {repository.language ? (
                <ProjectStackTech>
                  <Text color="grey2" type="body2">
                    {repository.language}
                  </Text>
                </ProjectStackTech>
              ) : (
                <ProjectStackTech>
                  <Text color="grey2" type="body2">
                    Linguagem não identificada
                  </Text>
                </ProjectStackTech>
              )}
            </ProjectStack>

            <Text type="body1" color="grey2">
              {repository.description?.substring(0, 129)}
            </Text>
            <ProjectLinks>
              <ProjectLink target="_blank" href={repository.html_url}>
                <FaGithub /> Github Code
              </ProjectLink>
              {repository.homepage && (
                <ProjectLink target="_blank" href={repository.homepage}>
                  <FaShare /> Ver demo
                </ProjectLink>
              )}
            </ProjectLinks>
          </ProjectWrapper>
        ))}
    </>
  );
};
