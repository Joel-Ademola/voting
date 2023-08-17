// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract E_Voting {

event 
Vote(address owner, string title, string description, uint256 deadline, string image, Option[] options, address[] voters, uint256[] votes);

    struct Option {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    struct VotingData {
        address owner;
        string title;
        string description;
        uint256 deadline;
        string image;
        Option[] options;
        address[] voters;
        uint256[] votes;
    }

    struct Voting {
        VotingData data;
        mapping(address => bool) hasVoted;
    }
VotingData[] votings;

    // mapping(uint256 => VotingData) public votings;
    mapping(uint256 => Voting) public votings2;

    uint256 public numberOfVotes = 0;

    function createVote(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _deadline,
        string memory _image,
        string[] memory _options
    ) public returns (uint256) {
        Voting storage voting = votings2[numberOfVotes];
        require(_options.length > 0, "Invalid number of options");
        require(_deadline > block.timestamp, "The deadline should be a date in the future.");

        Option[] memory options = new Option[](_options.length);
        for (uint256 i = 0; i < _options.length; i++) {
            options[i] = Option(i, _options[i], 0);
        }
        // _owner=msg.sender;

        voting.data.owner = _owner;
        voting.data.title = _title;
        voting.data.description = _description;
        voting.data.deadline = _deadline;
        voting.data.image = _image;
        for (uint256 i = 0; i < options.length; i++) {
            voting.data.options.push(options[i]);
        }
        // emit Vote(msg.sender, _title, _description, _deadline, _image, options, voting.data.voters, voting.data.votes);

        numberOfVotes++;
        return numberOfVotes - 1;
    }

    function castVote(uint256 _id, string memory _option) public returns (uint256[] memory) {
        Voting storage vote = votings2[_id];
        address sender = msg.sender;

        require(!vote.hasVoted[sender], "Already voted");

        uint256 optionIndex = getOptionIndex(vote, _option);

        vote.hasVoted[sender] = true;
        vote.data.options[optionIndex].voteCount++;

        vote.data.voters.push(msg.sender);
        vote.data.votes.push(optionIndex);

        uint256[] memory optionVoteCounts = new uint256[](vote.data.options.length);

        for (uint256 i = 0; i < vote.data.options.length; i++) {
            optionVoteCounts[i] = vote.data.options[i].voteCount;
        }

        return optionVoteCounts;
    }

    function getOptionIndex(Voting storage _vote, string memory _option) internal view returns (uint256) {
        for (uint256 i = 0; i < _vote.data.options.length; i++) {
            if (keccak256(bytes(_vote.data.options[i].name)) == keccak256(bytes(_option))) {
                return i;
            }
        }
        revert("Option not found");
    }

    function getVoters(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (votings[_id].voters, votings[_id].votes);
    }

    function getAllVotes() public view returns (VotingData[] memory) {
        VotingData[] memory allVotes = new VotingData[](numberOfVotes);

        for (uint256 i = 0; i < numberOfVotes; i++) {
            allVotes[i] = votings2[i].data;
        }

        return allVotes;
    }
    function getVoteCount() public view returns (uint256) {
        return numberOfVotes;
    }
}
