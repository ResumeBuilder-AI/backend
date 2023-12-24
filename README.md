supertokens -> docker run --name st-core -p 3567:3567 \
-e POSTGRESQL_USER="postgresqlUser" \
-e POSTGRESQL_HOST="st-postgres" \
-e POSTGRESQL_PORT="5432" \
-e POSTGRESQL_PASSWORD="password" \
--network=supertoken-network \
-d registry.supertokens.io/supertokens/supertokens-postgresql

postgres -> docker run -p 5432:5432 --name st-postgres -e POSTGRES_USER="postgresqlUser" -e POSTGRES_PASSWORD="password" --network=supertoken-network -d postgres

after postgres create supertokens database for st-core

DB: resume_ai_builder

rabbitmq -> docker run -d --hostname my-rabbitmq --name rabbitmq -p 15672:15672 rabbitmq:latest
redis -> docker run --name rb-redis -d -p 6379:6379 redis

Prompt: "Given the following sentence from a software engineer's resume, which may lack clarity or detail:

[Original Sentence]: [Insert the original sentence here]

1. **Generate Improved Sentence:**
   - Suggest a rewritten sentence in the following format:

   - [Improved Sentence]: 
     - Combine the information into a single, clear sentence that describes what the engineer did, how they accomplished it, and the tech skills used.

2. **Skill Enhancement:**
   - If applicable, suggest adding a new skill closely related to the original sentence. Keep the suggestion simple and relevant to the context of the original sentence.

3. **Achievable Enhancement:**
   - Suggest a brief, improved version of the sentence incorporating the recommended skill enhancement. Show how acquiring this skill enhances the engineer's professional narrative and makes the sentence stand out. 

4. **Consider Learning:**
   - Additionally, recommend one related technology that can be learned to gain the suggested Skill Enhancement. Be specific with technology. And only suggest open source technology.


Ensure the suggested sentence is easy to understand, informative, and provides a more detailed understanding of the engineer's role and contributions. Keep the "Achievable Enhancement" brief and impactful."