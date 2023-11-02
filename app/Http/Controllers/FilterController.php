<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Filter; // Import your Filters model

class FilterController extends Controller
{
    public function saveFilters(Request $request)
    {
        $id_user = $request->input('id_user');
        $data = $request->input('filters');
        $from = $request->input('from'); // Get the 'from' information
        $label = $request->input('label'); // Get the 'label' information

        // Assuming your database table has a JSON column named 'filters'
        $savedFilter = new Filter();
        $savedFilter->id_user = $id_user;
        $savedFilter->filters = json_encode($data);
        $savedFilter->from = $from; // Set the 'from' value
        $savedFilter->label = $label; // Set the 'label' value
        $savedFilter->save();

        return response()->json(['message' => 'Filters saved successfully']);
    }

    public function getFilters()
    {
        $filters = Filter::all();

        // You can loop through the filters and add the 'from' and 'label' information to each filter
        foreach ($filters as $filter) {
            $filter->from = $filter->from;
            $filter->label = $filter->label;
        }

        return response()->json(['filters' => $filters]);
    }

    public function getFiltersById()
    {
        // Retrieve the 'id_user' from local storage
        $id_user = (int)request()->get('id_user'); // Convert it to an integer

        // Fetch filters that match the 'id_user' from local storage
        $filters = Filter::where('id_user', $id_user)->get();

        // You can loop through the filters and add the 'from' and 'label' information to each filter
        foreach ($filters as $filter) {
            $filter->from = $filter->from;
            $filter->label = $filter->label;
        }

        return response()->json(['filters' => $filters]);
    }


    public function getFiltersByLabel(Request $request)
    {
        $label = $request->input('label');

        // Find the filter by label in your database
        $filter = Filter::where('label', $label)->first();

        if ($filter) {
            // Parse the JSON data from the 'filters' column
            $filterData = json_decode($filter->filters, true);

            return response()->json($filterData);
        } else {
            return response()->json(['message' => 'Filter not found'], 404);
        }
    }

    public function deleteFilterById(Request $request)
    {
        $id = $request->input('id');

        // Find the filter by id in your database
        $filter = Filter::find($id);

        if ($filter) {
            $filter->delete();

            return response()->json(['message' => 'Filter deleted successfully']);
        } else {
            return response()->json(['message' => 'Filter not found'], 404);
        }
    }

    public function checkLabelExists(Request $request)
    {
        $label = trim($request->input('label')); // Trim leading/trailing whitespace
        $id_user = $request->input('id_user');

        // Check if a filter with the given label already exists for the specific user
        $filterExists = Filter::where('label', $label)->where('id_user', $id_user)->exists();

        return response()->json(['exists' => $filterExists]);
    }

}
