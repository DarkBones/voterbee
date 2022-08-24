const translations = {
  en: {
    navbar: {
      tagline: 'Preferential voting made easy and anonymous',
      donate: {
        button: 'Donate',
        modal: {
          title: 'Donate',
          submit_button: 'Pay {{ symbol }}{{ amount }}',
          submit_button_sending: 'Sending...',
          thank_you: 'Thank you for donating!',
          error: 'Something went wrong. Please try again later.',
        },
      },
    },
    create_election: {
      creating: 'Creating Election...',
      create: 'Create Election',
      or: '... or ...',
      join: 'Join',
    },
    join_election: {
      placeholder: 'Enter Election ID',
    },
    errors: {
      generic: 'Something went wrong. Please try again later.',
      election_not_found: 'Election {{id}} not found',
    },
    elections: {
      banned: {
        message: 'You were banned from this election',
      },
      configure: {
        title: 'Configure your election',
        start: 'Start Election',
        errors: {
          not_enough_candidates: 'At least 2 candidates are required',
          no_title: 'Election name is empty',
        },
        name: {
          label: 'Name your election',
          placeholder_0: 'What should we do today?',
          placeholder_1: 'What is the best food?',
          placeholder_2: 'Where should we go for lunch?',
          placeholder_3: 'Who should organize the party?',
        },
        candidate: {
          name: 'Candidates',
          add: 'Add Candidate',
          label: 'Candidate',
          placeholder_0_0: 'Eat chicken wings',
          placeholder_0_1: 'Go to the movies',
          placeholder_0_2: 'Karting',
          placeholder_1_0: 'Pizza',
          placeholder_1_1: 'Hotdog',
          placeholder_1_2: 'Cookies',
          placeholder_2_0: 'Nandos',
          placeholder_2_1: 'The grub hut',
          placeholder_2_2: 'Fred\'s',
          placeholder_3_0: 'Bryan',
          placeholder_3_1: 'Dave',
          placeholder_3_2: 'Emma',
        },
        advanced: {
          title: 'Advanced Options',
          allow_users_to_add_candidates: 'Allow users to add candidates',
          users_can_add: 'Amount of candidates:',
        },
      },
      join: {
        name: {
          label: 'Your (nick)name',
          placeholder: 'Fill in your (nick)name',
        },
        join: 'Join Election',
        joining: 'Joining Election...',
        errors: {
          no_name: 'Name is empty',
        },
      },
      session: {
        share: {
          title: 'Share this link with your friends / colleages',
          copy_message: 'Link copied to clipboard',
        },
        voters: {
          title: 'Voters',
          votes: 'Votes:',
          kick: 'Kick {{name}} out',
          unkick: 'Let {{name}} back in',
          count_votes: 'Count Votes',
          counting_votes: 'Counting Votes...',
          errors: {
            not_enough_votes: 'At least 2 users must cast their vote',
          },
        },
        candidates: {
          title: 'Candidates',
          cast_vote: 'Cast Vote',
          already_voted: 'Already voted. Reorder your preferences to ammend your vote',
        },
        errors: {
          generic: 'Something went wrong. Please try again later.',
          duplicate_candidate: 'Candidate \'{{ name }}\' already exists',
          similar_candidate: '\'{{ newName }}\' is too similar to \'{{ name }}\'',
        },
        counting: 'Counting the votes...',
        deletemodal: {
          title: 'Are you sure?',
          warning: 'Deleting candidate \'{{ candidate }}\' will make it unavaiable for everyone.',
          cancel: 'Cancel',
          confirm: 'Delete Candidate',
          dont_ask_again: 'Don\'t ask me again',
        },
        add_candidate: {
          message_creator: 'Add candidates',
          message_one: 'You can add {{ count }} more candidate',
          message_other: 'You can add {{ count }} more candidates',
          placeholder: 'Add your own candidate',
          success: 'Candidate \'{{ name }}\' added',
        },
      },
      results: {
        winner: 'We have a winner!',
        tie: 'It\'s a tie!',
        tiebreaker_and: 'and',
        tiebreaker_intro: 'It was a tie between {{ winners }}.',
        tiebreaker_result_random: '{{ creatorName }} picked a random winner.',
        tiebreaker_result_pick: '{{ creatorName }} picked {{ picked }}.',
        reopen: 'Reopen election',
        pick: 'Pick {{name}}',
        pick_random: 'Pick Random',
        statistics: 'Election Statistics',
      },
    },
  },
  fr: {
    navbar: {
      tagline: 'Le vote préférentiel simplifié et anonyme',
      donate: {
        button: 'Faire un don',
        modal: {
          title: 'Faire un don',
          submit_button: 'Payez {{ amount }} {{ symbol }}',
          submit_button_sending: 'Envoi en cours...',
          thank_you: 'Merci de faire un don !',
          error: 'Quelque chose s\'est mal passé. Veuillez réessayer plus tard.',
        },
      },
    },
    create_election: {
      creating: 'Chargement...',
      create: 'Créer une élection',
      or: '... ou ...',
      join: 'Joindre',
    },
    join_election: {
      placeholder: 'ID d\'élection',
    },
    errors: {
      generic: 'Quelque chose s\'est mal passé. Veuillez réessayer plus tard.',
      election_not_found: 'Élection {{id}} introuvable',
    },
    elections: {
      banned: {
        message: 'Vous avez été banni de cette élection',
      },
      configure: {
        title: 'Configurez votre élection',
        start: 'Commencer l\'Élection',
        errors: {
          not_enough_candidates: 'Au moins 2 candidats sont requis',
          no_title: 'Le nom de l\'élection est vide',
        },
        name: {
          label: 'Nommez votre élection',
          placeholder_0: 'Que devons-nous faire aujourd\'hui ?',
          placeholder_1: 'Quelle est la meilleure nourriture ?',
          placeholder_2: 'Où devrions-nous aller déjeuner ?',
          placeholder_3: 'Qui doit organiser la fête ?',
        },
        candidate: {
          name: 'Candidats',
          add: 'Ajouter un candidat',
          label: 'Candidat',
          placeholder_0_0: 'Manger des ailes de poulet',
          placeholder_0_1: 'Aller au cinéma',
          placeholder_0_2: 'Karting',
          placeholder_1_0: 'Pizza',
          placeholder_1_1: 'Hotdog',
          placeholder_1_2: 'Biscuits',
          placeholder_2_0: 'Nandos',
          placeholder_2_1: 'La hutte de la bouffe',
          placeholder_2_2: 'Chez Fred',
          placeholder_3_0: 'Emma',
          placeholder_3_1: 'Léo',
          placeholder_3_2: 'Raphaël',
        },
        advanced: {
          title: 'Options Avancées',
          allow_users_to_add_candidates: 'Autoriser les électeurs à ajouter des candidats',
          users_can_add: 'Nombre de candidats :',
        },
      },
      join: {
        name: {
          label: 'Votre (sur)nom',
          placeholder: 'Remplissez votre (sur)nom',
        },
        join: 'Joindre l\'Élection',
        joining: 'Chargement...',
        errors: {
          no_name: 'Le nom est vide',
        },
      },
      session: {
        share: {
          title: 'Partagez ce lien avec vos amis / collègues',
          copy_message: 'Lien copié dans le presse-papiers',
        },
        voters: {
          title: 'Électeurs',
          votes: 'Votes :',
          kick: 'Mettre {{name}} à la porte',
          unkick: 'Laissez {{name}} revenir',
          count_votes: 'Compter les votes',
          counting_votes: 'Chargement...',
          errors: {
            not_enough_votes: 'Au moins 2 personnes doivent voter',
          },
        },
        candidates: {
          title: 'Candidats',
          cast_vote: 'Votez',
          already_voted: 'Déjà voté. Réorganisez vos préférences pour modifier votre vote',
        },
        errors: {
          generic: 'Quelque chose s\'est mal passé. Veuillez réessayer plus tard.',
          duplicate_candidate: 'Le candidat \'{{ name }}\' existe déjà',
          similar_candidate: '\'{{ newName }}\' ressemble trop à \'{{ name }}\'',
        },
        counting: 'Comptage des votes en cours....',
        deletemodal: {
          title: 'Êtes-vous sûr?',
          warning: 'La suppression du candidat \'{{ candidate }}\' le rendra indisponible pour tout le monde.',
          cancel: 'Annuler',
          confirm: 'Supprimer le candidat',
          dont_ask_again: 'Ne me demande plus',
        },
        add_candidate: {
          message_creator: 'Ajouter des candidats',
          message_one: 'Vous pouvez ajouter {{ count }} candidat supplémentaire',
          message_other: 'Vous pouvez ajouter {{ count }} autres candidats',
          placeholder: 'Ajoutez votre propre candidat',
          success: 'Candidat \'{{ name }}\' ajouté',
        },
      },
      results: {
        winner: 'Nous avons un gagnant!',
        tie: 'C\'est une égalité !',
        tiebreaker_and: 'et',
        tiebreaker_intro: 'C\'était une égalité entre {{ winners }}.',
        tiebreaker_result_random: '{{ creatorName }} a choisi un gagnant au hasard.',
        tiebreaker_result_pick: '{{ creatorName }} a choisi {{ picked }}.',
        reopen: 'Rouvrir l\'élection',
        pick: 'Choisissez {{name}}',
        pick_random: 'Choisissez au hasard',
        statistics: 'Statistiques Électorales',
      },
    },
  },
  nl: {
    navbar: {
      tagline: 'Voorkeurstemmen, gemakkelijk en anoniem',
      donate: {
        button: 'Doneer',
        modal: {
          title: 'Doneer',
          submit_button: 'Betaal {{ symbol }}{{ amount }}',
          submit_button_sending: 'Verzenden...',
          thank_you: 'Bedankt voor het doneren!',
          error: 'Er is iets fout gegaan. Probeer het later opnieuw.',
        },
      },
    },
    create_election: {
      creating: 'Laden...',
      create: 'Creëer Verkiezing',
      or: '... of ...',
      join: 'Meedoen',
    },
    join_election: {
      placeholder: 'Verkiezing ID',
    },
    errors: {
      generic: 'Er is iets fout gegaan. Probeer het later opnieuw.',
      election_not_found: 'Verkiezing {{id}} niet gevonden',
    },
    elections: {
      banned: {
        message: 'Je bent verbannen van deze verkiezing',
      },
      configure: {
        title: 'Configureer uw verkiezing',
        start: 'Start Verkiezing',
        errors: {
          not_enough_candidates: 'Minstens 2 kandidaten nodig',
          no_title: 'Verkiezing naam is niet ingevuld',
        },
        name: {
          label: 'Geef uw verkiezing een naam',
          placeholder_0: 'Wat zullen we doen vandaag?',
          placeholder_1: 'Wat is het lekkerst?',
          placeholder_2: 'Waar gaan we heen voor lunch?',
          placeholder_3: 'Wie zal het feest organiseren?',
        },
        candidate: {
          name: 'Kandidaten',
          add: 'Voeg Kandidaat toe',
          label: 'Kandidaat',
          placeholder_0_0: 'Kippenvleugels eten',
          placeholder_0_1: 'Naar de bioscoop gaan',
          placeholder_0_2: 'Karten',
          placeholder_1_0: 'Pizza',
          placeholder_1_1: 'Hotdog',
          placeholder_1_2: 'Koek',
          placeholder_2_0: 'Nandos',
          placeholder_2_1: 'De vreetschuur',
          placeholder_2_2: 'Fred\'s',
          placeholder_3_0: 'Liam',
          placeholder_3_1: 'Lucas',
          placeholder_3_2: 'Saar',
        },
        advanced: {
          title: 'Geavanceerde Opties',
          allow_users_to_add_candidates: 'Kiezers toestaan ​​kandidaten toe te voegen',
          users_can_add: 'Aantal kandidatenn:',
        },
      },
      join: {
        name: {
          label: 'Jouw (bij)naam',
          placeholder: '(bij)naam',
        },
        join: 'Doe mee',
        joining: 'Laden...',
        errors: {
          no_name: 'Naam is niet ingevuld',
        },
      },
      session: {
        share: {
          title: 'Deel deze link met vrienden / collega\'s',
          copy_message: 'Link gekopieerd',
        },
        voters: {
          title: 'Kiezers',
          votes: 'Stemmen:',
          kick: 'Verban {{name}}',
          unkick: 'Laat {{name}} weer binnen',
          count_votes: 'Tel Stemmen',
          counting_votes: 'Laden...',
          errors: {
            not_enough_votes: 'Minstens 2 stemmen nodig',
          },
        },
        candidates: {
          title: 'Kandidaten',
          cast_vote: 'Stem',
          already_voted: 'U heeft al gestemt. Verander de volgorde van de kandidaten om uw stem aan te passen.',
        },
        errors: {
          generic: 'Er is iets fout gegaan. Probeer het later opnieuw.',
          duplicate_candidate: 'Kandidaat \'{{ name }}\' bestaat al',
          similar_candidate: '\'{{ newName }}\' lijkt teveel op \'{{ name }}\'',
        },
        counting: 'Stemmen aan het tellen...',
        deletemodal: {
          title: 'Weet u het zeker?',
          warning: 'Door kandidaat \'{{ candidate }}\' te verwijderen, is deze voor iedereen niet meer beschikbaar.',
          cancel: 'Annuleren',
          confirm: 'Verwijder Kandidaat',
          dont_ask_again: 'Vraag het me niet meer',
        },
        add_candidate: {
          message_creator: 'Voeg kandidaten toe',
          message_one: 'U kunt {{ count }} kandidaat toevoegen',
          message_other: 'U kunt {{ count }} kandidaten toevoegen',
          placeholder: 'Voeg een kandidaat toe',
          success: 'Kandidaat \'{{ name }}\' toegevoegd',
        },
      },
      results: {
        winner: 'We hebben een winnaar!',
        tie: 'Het is gelijkspel!',
        tiebreaker_and: 'en',
        tiebreaker_intro: 'Het stond gelijk tussen {{ winners }}.',
        tiebreaker_result_random: '{{ creatorName }} koos een willekeurige winnaar.',
        tiebreaker_result_pick: '{{ creatorName }} koos {{ picked }}.',
        reopen: 'Heropen verkiezing',
        pick: 'Kies {{name}}',
        pick_random: 'Kies Willekeurig',
        statistics: 'Verkiezingsstatistieken',
      },
    },
  },
}

export default translations
