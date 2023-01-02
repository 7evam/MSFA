import React from "react";

export const mlbReg = (withBonus) => {
  const mlbHeaders = [
    {
      header: "Name",
      accessorKey: "name"
    },
    {
      header: "Wins",
      accessorKey: "wins"
    },
    {
      header: "Losses",
      accessorKey: "losses"
    }
  ];
  if (withBonus) {
    mlbHeaders.push({
      header: "Playoff Bonus",
      accessorKey: "playoffBonus"
    });
  }
  return mlbHeaders;
};

export const nflReg = (withBonus) => {
  const nflHeaders = [
    {
      header: "Name",
      accessorKey: "name"
    },
    {
      header: "Wins",
      accessorKey: "wins"
    },
    {
      header: "Losses",
      accessorKey: "losses"
    },
    {
      header: "Ties",
      accessorKey: "ties"
    }
  ];
  if (withBonus) {
    nflHeaders.push({
      header: "Playoff Bonus",
      accessorKey: "playoffBonus"
    });
  }
  return nflHeaders;
};

export const nhlReg = (withBonus) => {
  const nhlHeaders = [
    {
      header: "Name",
      accessorKey: "name"
    },
    {
      header: "Wins",
      accessorKey: "wins"
    },
    {
      header: "Losses",
      accessorKey: "losses"
    },
    {
      header: "OTL",
      accessorKey: "otl"
    }
  ];

  if (withBonus) {
    nhlHeaders.push({
      header: "Playoff Bonus",
      accessorKey: "playoffBonus"
    });
  }
  return nhlHeaders;
};

export const nbaReg = (withBonus) => {
  const nbaHeaders = [
    {
      header: "Name",
      accessorKey: "name"
    },
    {
      header: "Wins",
      accessorKey: "wins"
    },
    {
      header: "Losses",
      accessorKey: "losses"
    }
  ];
  if (withBonus) {
    nbaHeaders.push({
      header: "Playoff Bonus",
      accessorKey: "playoffBonus"
    });
  }
  return nbaHeaders;
};

export const mlbPlayoffs = [
  {
    header: "Name",
    accessorKey: "name"
  },
  {
    header: "WC Game Won",
    accessorKey: "r1WinGame"
  },
  {
    header: "WC Game Lost",
    accessorKey: "r1LoseGame"
  },
  {
    header: "WC Series Won",
    accessorKey: "r1WinSeries"
  },
  {
    header: "DS Game Won",
    accessorKey: "r2WinGame"
  },
  {
    header: "DS Game Lost",
    accessorKey: "r2LoseGame"
  },
  {
    header: "DS Series Won",
    accessorKey: "r2WinSeries"
  },
  {
    header: "CS Game Won",
    accessorKey: "r3WinGame"
  },
  {
    header: "CS Game Lost",
    accessorKey: "r3LoseGame"
  },
  {
    header: "CS Series Won",
    accessorKey: "r3WinSeries"
  },
  {
    header: "WS Game Won",
    accessorKey: "r4WinGame"
  },
  {
    header: "WS Game Lost",
    accessorKey: "r4LoseGame"
  },
  {
    header: "WS Series Won",
    accessorKey: "r4WinSeries"
  }
];
export const nflPlayoffs = [
  {
    header: "Name",
    accessorKey: "name"
  },
  {
    header: "WC Game Won",
    accessorKey: "r1WinSeries"
  },
  {
    header: "Divisional Game Won",
    accessorKey: "r2WinSeries"
  },
  {
    header: "CC Game Won",
    accessorKey: "r3WinSeries"
  },
  {
    header: "Super Bowl Won",
    accessorKey: "r4WinSeries"
  }
];
export const nhlPlayoffs = [
  {
    header: "Name",
    accessorKey: "name"
  },
  {
    header: "R1 Game Won",
    accessorKey: "r1WinGame"
  },
  {
    header: "R1 Game Lost",
    accessorKey: "r1LoseGame"
  },
  {
    header: "R1 Series Won",
    accessorKey: "r1WinSeries"
  },
  {
    header: "R2 Game Won",
    accessorKey: "r2WinGame"
  },
  {
    header: "R2 Game Lost",
    accessorKey: "r2LoseGame"
  },
  {
    header: "R2 Series Won",
    accessorKey: "r2WinSeries"
  },
  {
    header: "CS Game Won",
    accessorKey: "r3WinGame"
  },
  {
    header: "CS Game Lost",
    accessorKey: "r3LoseGame"
  },
  {
    header: "CS Series Won",
    accessorKey: "r3WinSeries"
  },
  {
    header: "SC Game Won",
    accessorKey: "r4WinGame"
  },
  {
    header: "SC Game Lost",
    accessorKey: "r4LoseGame"
  },
  {
    header: "SC Series Won",
    accessorKey: "r4WinSeries"
  }
];
export const nbaPlayoffs = [
  {
    header: "Name",
    accessorKey: "name"
  },
  {
    header: "R1 Game Won",
    accessorKey: "r1WinGame"
  },
  {
    header: "R1 Game Lost",
    accessorKey: "r1LoseGame"
  },
  {
    header: "R1 Series Won",
    accessorKey: "r1WinSeries"
  },
  {
    header: "R2 Game Won",
    accessorKey: "r2WinGame"
  },
  {
    header: "R2 Game Lost",
    accessorKey: "r2LoseGame"
  },
  {
    header: "R2 Series Won",
    accessorKey: "r2WinSeries"
  },
  {
    header: "CS Game Won",
    accessorKey: "r3WinGame"
  },
  {
    header: "CS Game Lost",
    accessorKey: "r3LoseGame"
  },
  {
    header: "CS Series Won",
    accessorKey: "r3WinSeries"
  },
  {
    header: "Finals Game Won",
    accessorKey: "r4WinGame"
  },
  {
    header: "Finals Game Lost",
    accessorKey: "r4LoseGame"
  },
  {
    header: "Finals Series Won",
    accessorKey: "r4WinSeries"
  }
];
